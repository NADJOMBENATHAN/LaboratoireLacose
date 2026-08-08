function LaboratoireItem({ nom, onClick }) {
  return (
    <li
      onClick={onClick}
      style={{ cursor: "pointer", textDecoration: "underline" }}
    >
      {nom}
    </li>
  );
}
// function LaboratoireItem(props){
//       return <li>{props.nom}</li>
// }
export default LaboratoireItem;
