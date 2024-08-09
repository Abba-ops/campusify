import { Placeholder, Table } from "react-bootstrap";

export default function TablePlaceholder({ headers, rowCount }) {
  return (
    <Table size="sm" responsive striped>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rowCount)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((_, colIndex) => (
              <td key={colIndex}>
                <Placeholder as="div" animation="glow">
                  <Placeholder xs={8} />
                </Placeholder>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
