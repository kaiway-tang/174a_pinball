import {defs, tiny} from '../examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export class Obstacle {
    constructor(shape, material, position, bounciness) {
        this.bounciness = bounciness;
        this.position = position;
        this.shape = shape;
        this.material = material;
    }
}

export class Cylindrical extends Obstacle {
    constructor(shape, material, position, bounciness, radius) {
        super(shape, material, position, bounciness);
        this.radius = radius;
    }

    render(context, program_state) {
        this.shape.draw(context, program_state, Mat4.identity().times(Mat4.translation(this.position[0],this.position[1],this.position[2])), this.material);
    }
}