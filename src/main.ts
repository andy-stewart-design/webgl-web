import GlslCanvas from "glslCanvas";
import frag from "./sketches/240604.frag?raw";
import "./main.css";

function init() {
  // Object.values(import.meta.glob("./sketches/*.frag", { as: "raw" }))[0]().then(
  //   (res) => console.log(res)
  // );

  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("App not found");

  const startingRect = app.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  canvas.width = startingRect.width;
  canvas.height = startingRect.height;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;

  const sandbox = new GlslCanvas(canvas);
  sandbox.load(frag);
  sandbox.setUniform("u_pi", Math.PI);

  const resizeObserver = new ResizeObserver((entries) => {
    const [app] = entries;
    const width = app.contentRect.width;
    const height = app.contentRect.height;
    if ((width === startingRect.width, height === startingRect.height)) return;

    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
    sandbox.load(frag);
  });

  resizeObserver.observe(app);
  app.append(canvas);
}

init();
