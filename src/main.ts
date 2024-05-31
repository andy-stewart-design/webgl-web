import GlslCanvas from "glslCanvas";
import frag from "./sketches/circle.frag?raw";
import "./main.css";

function init() {
  Object.values(import.meta.glob("./sketches/*.frag", { as: "raw" }))[0]().then(
    (res) => console.log(res)
  );

  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("App not found");

  const canvas = document.createElement("canvas");
  canvas.width = 600;
  canvas.height = 400;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;

  const sandbox = new GlslCanvas(canvas);
  sandbox.load(frag);
  sandbox.setUniform("u_canvas", canvas.width * 2, canvas.height * 2);
  app.append(canvas);
}

init();
