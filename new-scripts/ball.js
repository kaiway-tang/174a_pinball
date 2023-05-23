import {defs, tiny} from '../examples/common.js';
import {PhysicsCalculations} from "./physics-calculations.js";

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export class Ball {
    constructor(shape, material, position, velocity) {
        this.shape = shape;
        this.material = material;
        this.position = position;
        this.velocity = velocity;
        this.gravity = -300;
        this.bounciness = .97;

        this.PhysicsCalculations = new PhysicsCalculations();
    }

    update_object(context, program_state) {
        const dt = program_state.animation_delta_time / 1000;
        this.velocity[1] = this.velocity[1] + this.gravity * dt;
        this.update_position(dt);
        this.render(context, program_state);
    }

    update_position(dt) {
        this.position = this.position.plus(this.velocity.times(dt));

        this.handle_boundary_collision(8, 6);
    }

    collide(normal, tangent, bounciness) {
        let normal_component =
            this.PhysicsCalculations.dot_product(this.velocity, normal)
            / this.PhysicsCalculations.sqr_magnitude(normal) * normal;

        let tangent_component =
            this.PhysicsCalculations.dot_product(this.velocity, tangent)
            / this.PhysicsCalculations.sqr_magnitude(tangent) * tangent;

        //log the normal and tangent components
        console.log("normal component: " + normal_component + " tangent component: " + tangent_component);

        this.velocity = normal_component * -bounciness + tangent_component;
    }

    handle_boundary_collision(width, height) {
        if (this.position[0] > width)
        {
            this.collide(vec3(-1, 0, 0), vec3(0,1,0), 1);
        }

        if (this.position[0] < -width) {
            this.collide(vec3(1, 0, 0), vec3(0,1,0),1);
        }

        if (this.position[1] < -height) {
            this.collide(vec3(0, 1, 0),vec3(1,0,0),1);

            if (Math.abs(this.velocity[1]) < 10)
            {
                this.velocity[1] = 0;
                this.position[1] = -height;
            }
        }

        if (this.position[1] > height) {
            this.position[1] = height - (this.position[1] - height);
            this.velocity[1] *= -this.bounciness;
        }
    }

    //this.shapes.torus.draw(context, program_state, model_transform, this.materials.test.override({color: yellow}));
    render(context, program_state) {
        this.shape.draw(context, program_state, Mat4.identity().times(Mat4.translation(this.position[0],this.position[1],this.position[2])), this.material);
    }
}