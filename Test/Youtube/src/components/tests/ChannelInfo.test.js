import { render, screen, waitFor } from "@testing-library/react";
import { withAllContexts, withRouter } from "../../tests/utils";
import { Route } from "react-router-dom";
import ChannelInfo from "../ChannelInfo";

describe("ChannelInfo", () => {
  const fakeYoutube = {
    channelImageUrl: jest.fn(),
  };

  afterEach(() => fakeYoutube.channelImageUrl.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.channelImageUrl.mockImplementation(() => "url");

    render(withAllContexts(withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />), fakeYoutube));

    await waitFor(() => screen.findByText("channel"));
  });
});
