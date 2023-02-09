import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <small>
        &copy; {new Date().getFullYear()} made with{" "}
        <FaHeart style={{ color: "red" }} /> by -{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/Dev.NghiaTran/"
        >
          Trần Trung Nghĩa
        </a>
      </small>
    </footer>
  );
}

export default Footer;
