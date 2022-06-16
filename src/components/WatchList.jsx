import React from "react";
import { useState, useEffect } from "react";
import WindowHeader from "./WindowHeader";
import WatchListCSS from "../style/WatchList.module.css";
import WatchListAddress from "./WatchListAddress";
import WatchListAddAddress from "./WatchListAddAddress";
import WatchListSearch from "./WatchListSearch";
import { ethers } from "ethers";
import { AiOutlineLoading } from "react-icons/ai";
import { onValue, set, ref, update, remove } from "firebase/database";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const WatchList = ({
  database,
  account,
  addresses,
  setAddresses,
  removeItem,
  addItem,
  isItemStatic,
  setItemStatic,
}) => {
  const [newAddress, setNewAddress] = useState("");
  const [newAlias, setNewAlias] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const addWatchListAddress = async (address, addressInfo) => {
    //update state
    const listAddresses = [...addresses, { ...addressInfo, address: address }];
    setAddresses(listAddresses);

    //update database
    set(
      ref(database, `users/${account}/watchedAddresses/${address}`),
      addressInfo
    );
  };

  const handleChangeAlert = async (addressToChange) => {
    //update state
    const prevAlerts = addresses.find(
      (address) => address.address === addressToChange
    ).alerts;
    const listAddresses = addresses.map((address) =>
      address.address === addressToChange
        ? /*Copy address but changed alerts status to opposite*/
          { ...address, alerts: !address.alerts }
        : address
    );
    setAddresses(listAddresses);

    //update database
    update(
      ref(database, `users/${account}/watchedAddresses/${addressToChange}`),
      { alerts: !prevAlerts }
    );
  };

  const handleDelete = async (addressToDelete) => {
    //set state
    const listAddresses = addresses.filter(
      (address) => address.address !== addressToDelete
    );
    setAddresses(listAddresses);

    //update database
    remove(
      ref(database, `users/${account}/watchedAddresses/${addressToDelete}`)
    );
  };

  const getAddressInfo = async (address, ens) => {
    let resolver = null;
    if (ens) {
      resolver = await provider.getResolver(ens);
    }
    const addressInfo = {
      alerts: true,
      alias: newAlias,
      ens: ens,
      avatar: resolver ? await resolver.getAvatar() : null,
      twitterName: resolver ? await resolver.getText("com.twitter") : null,
      telegramName: resolver ? await resolver.getText("org.telegram") : null,
      email: resolver ? await resolver.getText("email") : null,
      website: resolver ? await resolver.getText("url") : null,
      location: resolver ? await resolver.getText("location") : null,
      dateAdded: new Date().toISOString(),
    };
    //if address avatar is not null get the url
    if (addressInfo.avatar) {
      addressInfo.avatar = addressInfo.avatar.url;
    }
    if (addressInfo.website && !addressInfo.website.includes("https://")) {
      addressInfo.website = `https://${addressInfo.website}`;
    }

    return addressInfo;
  };

  //helper func to check if address is already in list
  const addressExistsinList = (newAddress) => {
    if (
      addresses.findIndex(
        (address) => address.address.toLowerCase() === newAddress.toLowerCase()
      ) >= 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleWatchListAdd = async (e) => {
    e.preventDefault();
    if (!newAddress) {
      return;
    }
    if (ethers.utils.isAddress(newAddress)) {
      /**If the address to add is a valid eth address */
      if (addressExistsinList(newAddress)) {
        alert("This address already exists in your watchlist.");
        return;
      } else {
        const ens = await provider.lookupAddress(newAddress);
        const addressInfo = await getAddressInfo(newAddress, ens);
        addWatchListAddress(newAddress, addressInfo);
      }
      // if the address to add is a valid ens
    } else if (await provider.resolveName(newAddress)) {
      const address = await provider.resolveName(newAddress);
      if (addressExistsinList(address)) {
        alert("This address already exists in your watchlist.");
        return;
      } else {
        const addressInfo = await getAddressInfo(address, newAddress);
        addWatchListAddress(address, addressInfo);
      }
    } else {
      alert(
        "Not a valid address. Please ensure the address you entered exists. Check the following link: https://etherscan.io/address/" +
          newAddress
      );
      return;
    }
    /**Sets the input text to empty */
    setNewAddress("");
    setNewAlias("");
  };

  const filteredAddresses = addresses
    .filter(
      (address) =>
        address.address.toLowerCase().includes(search.toLowerCase()) ||
        (address.alias &&
          address.alias.toLowerCase().includes(search.toLowerCase())) ||
        (address.ens &&
          address.ens.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      a = new Date(a.dateAdded);
      b = new Date(b.dateAdded);
      return a < b ? 1 : a > b ? -1 : 0;
    });

  /**An empty array makes useEffect run at every reload, not every render */
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        let data = null;
        onValue(
          ref(database, `users/${account}/watchedAddresses`),
          (snapshot) => {
            try {
              data = snapshot.val();
              const listAddresses = Object.entries(data).map(
                ([key, value]) => ({
                  address: key,
                  alerts: value.alerts,
                  alias: value.alias,
                  ens: value.ens,
                  avatar: value.avatar,
                  twitterName: value.twitterName,
                  telegramName: value.telegramName,
                  email: value.email,
                  website: value.website,
                  location: value.location,
                  dateAdded: value.dateAdded,
                })
              );
              setAddresses(listAddresses);
            } catch (e) {
              console.log(
                "Caught BS error that I cannot figure out but affects nothing" +
                  e
              );
            }
          }
        );
        // console.log(listAddresses)
        // console.log(addresses)
        setFetchError(null);
      } catch (e) {
        setFetchError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    /**fetchAddresses returns no value, so you can simply call it, if it did return something you'd need to us an async instantly invoked function expression */
    /**simulate api response time */
    fetchAddresses();
    // fetchAddresses()
  }, [
    account,
    database,
    setAddresses,
  ]); /**Account as a depedency, ensures account is not null when addresses are fetched */

  return (
    <div id={WatchListCSS.watchList}>
      <WindowHeader
        window="Watchlist"
        removeItem={removeItem}
        addItem={addItem}
        isItemStatic={isItemStatic}
        setItemStatic={setItemStatic}
      />
      {isLoading && (
        <AiOutlineLoading style={{ marginTop: "40%" }} className="loadingSvg" />
      )}
      {fetchError && <p> {`Error: ${fetchError}`}</p>}
      {!fetchError && !isLoading && (
        <>
          <WatchListAddAddress
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            newAlias={newAlias}
            setNewAlias={setNewAlias}
            handleWatchListAdd={handleWatchListAdd}
          />
          <WatchListSearch search={search} setSearch={setSearch} />
          {filteredAddresses.length > 0 ? (
            <ol>
              {filteredAddresses.map((address) => (
                <WatchListAddress
                  key={address.address}
                  address={address}
                  handleChangeAlert={handleChangeAlert}
                  handleDelete={handleDelete}
                />
              ))}
            </ol>
          ) : !account ? (
            <p style={{ marginTop: "30%", height: "100%" }}>
              Your wallet is not connected.
            </p>
          ) : (
            <p style={{ marginTop: "30%", height: "100%" }}>
              Your list is empty.
            </p>
          )}
          <p id={WatchListCSS.watchlistLength}>
            {filteredAddresses.length} Address(es)
          </p>
        </>
      )}
    </div>
  );
};

export default WatchList;
