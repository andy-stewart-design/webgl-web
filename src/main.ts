import GlslCanvas from "glslCanvas";
import frag from "./sketches/circle.frag?raw";
import "./main.css";

function init() {
  // Object.values(import.meta.glob("./sketches/*.frag", { as: "raw" }))[0]().then(
  //   (res) => console.log(res)
  // );

  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("App not found");

  const appSize = app.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  canvas.width = appSize.width - 100;
  canvas.height = appSize.height - 100;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;

  const sandbox = new GlslCanvas(canvas);
  sandbox.load(frag);
  sandbox.setUniform("u_pi", Math.PI);
  app.append(canvas);

  const resizeObserver = new ResizeObserver((entries) => {
    const [app] = entries;

    canvas.width = app.borderBoxSize[0].inlineSize - 100;
    canvas.height = app.borderBoxSize[0].blockSize - 100;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

    console.log(app);
  });
  resizeObserver.observe(app);
}

init();
