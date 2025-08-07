import generateDict from "./preprocessor";

const mapping = {
  "Print": "print",
  "all_variables": "global_variables",
  "arg_max": "argmax",
  "arg_min": "argmin",
  "compat": {
    "v1": {
      "Print": "print",
      "all_variables": "global_variables",
      "arg_max": "argmax",
      "arg_min": "argmin",
      "div": "divide",
      "initialize_all_variables": "global_variables_initializer",
      "initializers": {
        "uniform_unit_scaling": "variance_scaling"
      },
      "metrics": {
        "auc": "AUC"
      },
      "mixed_precision": {
        "DynamicLossScale": "LossScaleOptimizer",
        "FixedLossScale": "LossScaleOptimizer",
        "experimental": {
          "DynamicLossScale": "LossScaleOptimizer",
          "FixedLossScale": "LossScaleOptimizer"
        }
      },
      "multinomial": "categorical",
      "random": {
        "multinomial": "categorical"
      },
      "saved_model": {
        "load": "load",
        "loader": {
          "load": "load"
        }
      },
      "sparse_to_dense": "to_dense",
      "substr": "substr",
      "to_bfloat16": "cast",
      "to_complex128": "cast",
      "to_complex64": "cast",
      "to_double": "cast",
      "to_float": "cast",
      "to_int32": "cast",
      "to_int64": "cast",
      "train": {
        "experimental": {
          "DynamicLossScale": "LossScaleOptimizer",
          "FixedLossScale": "LossScaleOptimizer"
        }
      },
      "uniform_unit_scaling_initializer": "variance_scaling"
    }
  },
  "config": {
    "experimental_run_functions_eagerly": "run_functions_eagerly"
  },
  "distribute": {
    "experimental": {
      "MultiWorkerMirroredStrategy": "MultiWorkerMirroredStrategy"
    }
  },
  "div": "divide",
  "initialize_all_variables": "global_variables_initializer",
  "initializers": {
    "uniform_unit_scaling": "variance_scaling"
  },
  "metrics": {
    "auc": "AUC"
  },
  "mixed_precision": {
    "DynamicLossScale": "LossScaleOptimizer",
    "FixedLossScale": "LossScaleOptimizer",
    "experimental": {
      "DynamicLossScale": "LossScaleOptimizer",
      "FixedLossScale": "LossScaleOptimizer"
    }
  },
  "multinomial": "categorical",
  "random": {
    "multinomial": "categorical"
  },
  "saved_model": {
    "loader": {
      "load": "load"
    }
  },
  "sparse_to_dense": "to_dense",
  "substr": "substr",
  "to_bfloat16": "cast",
  "to_complex128": "cast",
  "to_complex64": "cast",
  "to_double": "cast",
  "to_float": "cast",
  "to_int32": "cast",
  "to_int64": "cast",
  "train": {
    "experimental": {
      "DynamicLossScale": "LossScaleOptimizer",
      "FixedLossScale": "LossScaleOptimizer"
    }
  },
  "uniform_unit_scaling_initializer": "variance_scaling"
}

export default mapping;