import { render, screen } from "@testing-library/react";
import { Route } from "react-router-dom";
import { withAllContexts, withRouter } from "../../tests/utils";
import ChannelInfo from "../ChannelInfo";

describe("ChannelInfo", () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");

    const { asFragment } = renderChannelInfo();

    await screen.findByRole("img");

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without URL", () => {
    fakeYoutube.channelImageURL.mockImplementation(() => {
      throw new Error("error");
    });
    renderChannelInfo();

    expect(screen.queryByRole("img")).toBeNull();
  });

  function renderChannelInfo() {
    return render(withAllContexts(withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />), fakeYoutube));
  }
});
