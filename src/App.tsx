import { List } from "./components/List";
import { DEFAULT_LIST } from "./constants/list";

export default function App() {
  return <List initialItems={DEFAULT_LIST} />;
}
