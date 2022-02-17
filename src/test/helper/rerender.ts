import React from "react";
import { RenderResult } from "@testing-library/react";

export function rerender(render: RenderResult, ui: React.ReactElement) {
  render.unmount();
  render.rerender(ui);

  return render;
}
