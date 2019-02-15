/**
 * Interfaces used in Google Vision API results
 */
export interface Point2D {
    x: number;
    y: number;
}

export interface Point3D {
    x: number;
    y: number;
    z: number;
}

export interface FaceFeature {
    type: string;
    position: Point3D;
}

export interface Vertex2Array {
    vertices: Array<Point2D>;
    normalizedVertices?: any;
}

export interface FaceAnnotation {
    landmark: Array<FaceFeature>;
    boundingPoly: Array<any>;
    fdBoundingPoly: Array<any>;
    rollAngle: number;
    panAngle: number;
    tiltAngle: number;
    detectionConfidence: number;
    landmarkingConfidence: number;
    joyLikelihood: string;
    sorrowLikelihood: string;
    angerLikelihood: string;
    surpriseLikelihood: string;
    underExposedLikelihood: string;
    blurredLikelihood: string;
    headwearLikelihood: string;
}

export interface ApiVisionResponse {
    faceAnnotations: Array<FaceAnnotation>;
}
