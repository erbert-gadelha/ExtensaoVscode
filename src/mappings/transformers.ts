const mapping = {
    "BeitFeatureExtractor": "BeitImageProcessor",
    "ConditionalDetrFeatureExtractor": "ConditionalDetrImageProcessor",
    "ConvNextFeatureExtractor": "ConvNextImageProcessor",
    "DPTFeatureExtractor": "DPTImageProcessor",
    "DeformableDetrFeatureExtractor": "DeformableDetrImageProcessor",
    "DetrFeatureExtractor": "DetrImageProcessor",
    "DonutFeatureExtractor": "DonutImageProcessor",
    "GLPNFeatureExtractor": "GLPNImageProcessor",
    "HubertForCTC": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "LayoutLMv2FeatureExtractor": "LayoutLMv2ImageProcessor",
    "MaskFormerFeatureExtractor": "MaskFormerImageProcessor",
    "MobileNetV1FeatureExtractor": "MobileNetV1ImageProcessor",
    "MobileViTFeatureExtractor": "MobileViTImageProcessor",
    "OwlViTFeatureExtractor": "OwlViTImageProcessor",
    "PerceiverFeatureExtractor": "PerceiverImageProcessor",
    "PoolFormerFeatureExtractor": "PoolFormerImageProcessor",
    "SEWDForCTC": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "SEWForCTC": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "SEWForSequenceClassification": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "SegformerFeatureExtractor": "SegformerImageProcessor",
    "TFHubertForCTC": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "TFWav2Vec2ForCTC": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "UniSpeechForCTC": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "UniSpeechSatForCTC": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "ViTFeatureExtractor": "ViTImageProcessor",
    "VideoMAEFeatureExtractor": "VideoMAEImageProcessor",
    "Wav2Vec2ForCTC": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "WavLMForCTC": {
      "freeze_feature_extractor": "freeze_feature_encoder"
    },
    "YolosFeatureExtractor": "YolosImageProcessor"
}

export default mapping;