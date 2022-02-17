import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DEFAULT_LIST } from "../constants/list";
import { rerender } from "../test/helper/rerender";
import { List } from "./List";

let RENDERED_COMPONENT: RenderResult;

describe("App Component", () => {
  beforeEach(() => {
    RENDERED_COMPONENT = render(<List initialItems={DEFAULT_LIST} />);
  });

  it("should render list items", () => {
    const { getByText, queryByText } = RENDERED_COMPONENT;

    const items = DEFAULT_LIST.map((item) => getByText(item));

    for (const item of items) {
      expect(item).toBeInTheDocument();
    }

    const item = "Gabriel";

    rerender(RENDERED_COMPONENT, <List initialItems={[item]} />);

    expect(getByText(item)).toBeInTheDocument();
    expect(queryByText(DEFAULT_LIST[0])).not.toBeInTheDocument();
  });

  it("should be able to add a new item in the list", async () => {
    const { getByTestId, findByText } = RENDERED_COMPONENT;

    const inputField = getByTestId("input-field");
    const addButton = getByTestId("add-button");

    userEvent.type(inputField, "New Item");
    userEvent.click(addButton);

    expect(await findByText("New Item")).toBeInTheDocument();
  });

  it("should be able to reset list items to default", async () => {
    const { getByTestId } = RENDERED_COMPONENT;

    const listItems = getByTestId("list-items");
    const resetButton = getByTestId("reset-button");

    userEvent.click(resetButton);

    expect(listItems.childElementCount).toBe(3);
  });

  it("should be able to remove item from the list", async () => {
    const item = "Menezes";
    const { getAllByTestId, queryByText } = RENDERED_COMPONENT;

    const removeButtons = getAllByTestId("remove-button");

    userEvent.click(removeButtons[0]);

    await waitFor(() => {
      return expect(queryByText(item)).not.toBeInTheDocument();
    });
  });
});
