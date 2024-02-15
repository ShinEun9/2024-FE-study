import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from "react-test-renderer";
import { Route } from "react-router-dom";
import SearchHeader from "../SearchHeader";
import { withRouter } from "../../tests/utils";

describe("SearchHeader", () => {
  it("renders correctly snapshot test", () => {
    const component = renderer.create(withRouter(<Route path="/" element={<SearchHeader />} />));
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("navigates to results page on search button click", async () => {
    const searchKeyword = "fake-keyword";

    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route path={`/videos/${searchKeyword}`} element={<p>{`Search result for ${searchKeyword}`}</p>} />
        </>,
        "/home"
      )
    );

    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");

    userEvent.type(searchInput, searchKeyword);
    await userEvent.click(searchButton);

    expect(screen.getByText(`Search result for ${searchKeyword}`)).toBeInTheDocument();
  });

  it("renders with keyword correctly", async () => {
    render(withRouter(<Route path="/:keyword" element={<SearchHeader />} />, "/bts"));
    expect(screen.getByDisplayValue("bts")).toBeInTheDocument();
  });
});
