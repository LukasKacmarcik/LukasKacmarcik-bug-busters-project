import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import ListOfItems from "../../listOfItems/ListOfItems";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home</h1>
      <Button
        color="success"
        size="lg"
        outline
        onClick={() => navigate("/addItem")}
      >
        Add Item
      </Button>
      <ListOfItems />
    </>
  );
}
