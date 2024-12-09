import styles from "./checkboxs.module.css";

const Checkbox = ({ type = "checkbox", className, ...props }) => {
  return (
    <input
      type="checkbox"
      className={`${styles.checkbox} ${className ?? ""}`}
      {...props}
    />
  );
};

export default Checkbox;
