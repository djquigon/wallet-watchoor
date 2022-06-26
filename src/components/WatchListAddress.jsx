import {
  FaVolumeUp,
  FaVolumeMute,
  FaTrashAlt,
  FaTwitter,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";
import { RiMailSendFill } from "react-icons/ri";
import { MdLocationOn } from "react-icons/md";
import etherscanLogo from "../assets/etherscanlogo.png";
import WatchListCSS from "../style/WatchList.module.css";
import makeBlockie from "ethereum-blockies-base64";
import ReactTooltip from "react-tooltip";

const WatchListAddress = ({ address, handleChangeAlert, handleDelete }) => {
  return (
    /**Keys are required for react list addresses */
    <li className={WatchListCSS.address}>
      <ReactTooltip class="tooltip" id={`dateAdded${address.address}`} />
      <span
        data-place="right"
        data-tip={`Added ${address.dateAdded.substring(
          0,
          address.dateAdded.indexOf("T")
        )} ${address.dateAdded.substring(
          address.dateAdded.indexOf("T") + 1,
          address.dateAdded.indexOf(".")
        )} UTC`}
        data-for={`dateAdded${address.address}`}
        style={{ width: "fit-content" }}
      >
        <p>
          {address.avatar ? (
            <img
              className={WatchListCSS.avatar}
              src={address.avatar}
              alt="avatar"
            ></img>
          ) : (
            <img
              className={WatchListCSS.avatar}
              src={makeBlockie(address.address)}
              alt="avatar"
            ></img>
          )}
          {address.ens
            ? ` ${address.alias} (${address.ens})`
            : ` ${address.alias}`}
        </p>
      </span>
      <p>{address.address}</p>
      <div className={WatchListCSS.addressOptions}>
        <ReactTooltip class="tooltip" id={`alerts${address.address}`} />
        <span
          data-place="right"
          data-tip={
            address.alerts
              ? `Mute ${address.alias}?`
              : `Unmute ${address.alias}?`
          }
          data-for={`alerts${address.address}`}
        >
          {address.alerts ? (
            <FaVolumeUp
              color="#00ac31"
              role="button"
              onClick={() => handleChangeAlert(address.address)}
            />
          ) : (
            <FaVolumeMute
              color="red"
              role="button"
              onClick={() => handleChangeAlert(address.address)}
            />
          )}
        </span>
        {address.twitterName && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://twitter.com/${address.twitterName}`}
          >
            <ReactTooltip class="tooltip" id={address.twitterName} />
            <FaTwitter
              data-tip={`Link to ${address.twitterName} on Twitter`}
              data-for={address.twitterName}
              color="#1ea1f1"
            />
          </a>
        )}
        {address.telegramName && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://t.me/${address.telegramName}`}
          >
            <ReactTooltip class="tooltip" id={address.telegramName} />
            <FaTelegram
              data-tip={`Link to ${address.telegramName} on Telegram`}
              data-for={address.telegramName}
              color="#24a1dd"
            />
          </a>
        )}
        {address.email && (
          <a href={`mailto:${address.email}`}>
            <ReactTooltip class="tooltip" id={address.email} />
            <RiMailSendFill
              data-tip={`Email ${address.email}`}
              data-for={address.email}
              color="#a040ff"
            />
          </a>
        )}
        {address.website &&
          (address.website.includes("https://") ? (
            <a target="_blank" rel="noreferrer" href={address.website}>
              <ReactTooltip class="tooltip" id={address.website} />
              <FaGlobe
                data-tip={`Link to ${address.alias}'s website`}
                data-for={address.website}
                color="#dda624"
              />
            </a>
          ) : (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://${address.website}`}
            >
              <ReactTooltip class="tooltip" id={address.website} />
              <FaGlobe
                data-tip={`Link to ${address.alias}'s website`}
                data-for={address.website}
                color="#dda624"
              />
            </a>
          ))}
        {address.location && (
          <>
            <ReactTooltip class="tooltip" id={address.location} />{" "}
            <MdLocationOn
              data-tip={address.location}
              data-for={address.location}
              color="#c36d2f"
            />
          </>
        )}
        <ReactTooltip class="tooltip" id={address.address} />
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://etherscan.io/address/${address.address}`}
          data-tip={`View address on etherscan`}
          data-for={address.address}
        >
          <img src={etherscanLogo} alt="avatar"></img>
        </a>
        <ReactTooltip class="tooltip" id={`delete${address.address}`} />
        <FaTrashAlt
          data-place="left"
          data-tip={`Delete ${address.alias} from your list?`}
          data-for={`delete${address.address}`}
          role="button"
          tabIndex="0"
          aria-label={`Delete ${address.alias}`}
          onClick={() => handleDelete(address.address)}
        />
      </div>
    </li>
  );
};

export default WatchListAddress;
