import {defs, tiny} from '../examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export class PhysicsCalculations {

    findIntersectionPoint(line_1_begin, line_1_end, line_2_begin, line_2_end) {
        const x1 = line_1_begin[0];
        const y1 = line_1_begin[1];
        const x2 = line_1_end[0];
        const y2 = line_1_end[1];
        const x3 = line_2_begin[0];
        const y3 = line_2_begin[1];
        const x4 = line_2_end[0];
        const y4 = line_2_end[1];

        const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (denominator === 0) {
            return null;
        }

        const numerator1 = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4);
        const numerator2 = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4);

        const intersectionX = numerator1 / denominator;
        const intersectionY = numerator2 / denominator;

        if (
            intersectionX < Math.min(x1, x2) ||
            intersectionX > Math.max(x1, x2) ||
            intersectionY < Math.min(y1, y2) ||
            intersectionY > Math.max(y1, y2) ||
            intersectionX < Math.min(x3, x4) ||
            intersectionX > Math.max(x3, x4) ||
            intersectionY < Math.min(y3, y4) ||
            intersectionY > Math.max(y3, y4)
        ) {
            return null; // Intersection point lies outside the segments
        }

        return vec3(intersectionX, intersectionY, 0);
    }

    find_circle_intersection_point(line_1_begin, line_1_end, circle_center, circle_radius) {

    }

    calculateBounceVector(directionVector, normalVector) {
        // Make sure incidentVector and normalVector are normalized (unit vectors)
        const direction = this.normalizeVector(directionVector);
        const normal = this.normalizeVector(normalVector);

        const dotProduct = dotProduct(direction, normal);
        const reflection = this.subtractVectors(direction, this.multiplyVectorByScalar(normal, 2 * dotProduct));

        return this.normalizeVector(reflection);
    }

    normalizeVector(vector) {
        const magnitude = Math.sqrt(this.dot_product(vector, vector));
        return this.multiplyVectorByScalar(vector, 1 / magnitude);
    }

    magnitude(vector) {
        return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
    }

    sqr_magnitude(vector) {
        return vector[0] * vector[0] + vector[1] * vector[1];
    }

    normal_of_line_segment(start, end) {
        return vec3(end[1] - start[1], start[0] - end[0], 0);
    }

    dot_product(vector1, vector2) {
        return vector1[0] * vector2[0] + vector1[1] * vector2[1];
    }

    multiplyVectorByScalar(vector, scalar) {
        return vec3(vector[0] * scalar, vector[1] * scalar, vector[2] * scalar, 0);
    }

    subtractVectors(vector1, vector2) {
        return vec3(vector1[0] - vector2[0], vector1[1] - vector2[1], vector1[2] - vector2[2], 0);
    }
}