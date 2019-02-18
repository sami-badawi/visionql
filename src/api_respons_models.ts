/**
 * Interfaces used in Google Vision API results
 */
export interface IPoint2D {
    x: number;
    y: number;
}

export interface IPoint3D {
    x: number;
    y: number;
    z: number;
}

export interface IFaceFeature {
    type: string;
    position: IPoint3D;
}

export interface IVertex2Array {
    vertices: IPoint2D[];
    normalizedVertices?: any;
}

export interface IFaceAnnotation {
    landmark: IFaceFeature[];
    boundingPoly: any[];
    fdBoundingPoly: any[];
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

export interface ILabelAnnotations {
    locations: any[];
    properties: any[];
    mid: string;
    locale: string;
    description: string;
    score: number;
    confidence: number;
    topicality: number;
    boundingPoly: any;
  }

export interface IApiVisionResponse {
    faceAnnotations: IFaceAnnotation[];
    landmarkAnnotations: any[];
    logoAnnotations: any[];
    labelAnnotations: ILabelAnnotations[];
    textAnnotations: any[];
    localizedObjectAnnotations: any[];
    safeSearchAnnotation: any;
    imagePropertiesAnnotation: any;
    error: any;
    cropHintsAnnotation: any;
    fullTextAnnotation: any;
    webDetection: any;
    productSearchResults: any;
    context: any;
}
