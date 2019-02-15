/**
 * Interfaces used in Google Vision API results
 */

export interface Point3D {
    x: number;
    y: number;
    z: number;
}

export interface FaceFeature          {
    type: string;
    position: Point3D;
}

export interface FaceAnnotation {
    landmark: Array<FaceFeature>;
}

export interface ApiVisionResponse {
    faceAnnotations: Array<FaceAnnotation>;
}
