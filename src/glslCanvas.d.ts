declare module "glslCanvas" {
  export default class GlslCanvas {
    constructor(
      canvas: HTMLCanvasElement,
      contextOptions?: WebGLContextAttributes
    );

    load(fragString: string, vertString?: string): void;
    loadTexture(
      name: string,
      url: string,
      options?: { filtering?: string; repeat?: boolean }
    ): void;
    refreshUniforms(): void;
    setUniform(name: string, ...value: number[]): void;
    setUniform(name: string, x: number, y: number): void;
    setUniform(name: string, x: number, y: number, z: number): void;
    setUniform(name: string, x: number, y: number, z: number, w: number): void;
    setUniform(name: string, value: number[]): void;
    setUniform(name: string, value: Float32Array): void;
    setUniform(name: string, value: Int32Array): void;
    setUniform(name: string, value: Uint32Array): void;
    setUniform(name: string, value: boolean): void;
    setUniform(name: string, value: number): void;
    setUniform(name: string, value: number[]): void;

    destroy(): void;

    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext | WebGL2RenderingContext;
    fragString: string;
    vertString: string;
    textures: { [key: string]: WebGLTexture };
    uniforms: { [key: string]: any };

    on(event: string, callback: (e: Event) => void): void;
  }
}
