const mapping = {
  "btriunpack": "lu_unpack",
  "chain_matmul": "linalg.multi_dot",
  "cholesky": "linalg.cholesky",
  "eig": "linalg.eig",
  "gels": "linalg.lstsq",
  "lstsq": "linalg.lstsq",
  "lu": "linalg.lu_factor",
  "lu_solve": "linalg.lu_solve",

  "matrix_rank": "linalg.matrix_rank",
  
  "nn": {
    "functional": {
        "upsample": "interpolate",
        "upsample_bilinear": "interpolate",
        "upsample_nearest": "interpolate"        
    },
    "modules": {
        "module": {
            "register_module_backward_hook": "register_module_full_backward_hook"
        }
    }
  }
}

export default mapping;