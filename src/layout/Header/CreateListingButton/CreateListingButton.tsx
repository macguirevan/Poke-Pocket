import { useNavigate } from "react-router-dom";
import styles from '../Header.module.css';

export default function CreateListingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/createlisting");
  };

  return (
    <button className={styles.createListingButton} onClick={handleClick}>
      Create Listing
    </button>
  );
}