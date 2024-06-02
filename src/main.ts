import GlslCanvas from "glslCanvas";
import debounce from "just-debounce-it";
import frag from "./sketches/240601.frag?raw";
import "./main.css";

function init() {
  // Object.values(import.meta.glob("./sketches/*.frag", { as: "raw" }))[0]().then(
  //   (res) => console.log(res)
  // );

  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) throw new Error("App not found");

  const appSize = app.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  canvas.width = appSize.width;
  canvas.height = appSize.height;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;

  const sandbox = new GlslCanvas(canvas);
  sandbox.load(frag);
  sandbox.setUniform("u_pi", Math.PI);
  app.append(canvas);

  const resizeObserver = new ResizeObserver((entries) => {
    const [app] = entries;
    const width = app.contentRect.width;
    const height = app.contentRect.height;
    debouncedSetCanvas(canvas, width, height);
  });

  resizeObserver.observe(app);
}

const debouncedSetCanvas = debounce(
  (canvas: HTMLCanvasElement, width: number, height: number) => {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
  },
  50
);

init();
