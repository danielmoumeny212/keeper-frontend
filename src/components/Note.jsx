import { FaRegEdit } from "react-icons/fa";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <div className="action">
        <div className="button">
          <button onClick={handleClick}>
            <DeleteIcon />
          </button>
          <button>
            <FaRegEdit />
          </button>
        </div>
        <span>{new Date(props.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default Note;
