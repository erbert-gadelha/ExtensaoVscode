const mapping:any = {
    "datasets": {
        "fetch_mldata": "fetch_openml"
    },
    "metrics": {
        "jaccard_similarity_score": "jaccard_score"
    },
    "mixture": {
        "jaccard_similarity_score": "jaccard_score",
        "GMM": "GaussianMixture"
    },
    "preprocessing.Imputer": "impute.SimpleImputer"
}

export default mapping;