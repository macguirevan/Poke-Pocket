import { useNavigate } from "react-router-dom";

export default function CreateListingButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/createlisting");
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      Create Listing
    </button>
  );
}
