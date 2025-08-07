const mapping: { [key: string]: object | string } = {
  // 1.20.0
  "it.ndindex.ndincr": {
    replaceWith: "next(it)",
    note: "Use next(it) para obter o próximo índice de it.ndindex.",
  },
  // 1.21.0
  typeDict: "sctypeDict",
  // Nota: não tenho certeza se funciona para esse tipo de replace
  "_ctypes.get_data": {
    replaceWith: "_ctypes.data",
    note: "Use a propriedade _ctypes.data em vez do método _ctypes.get_data.",
  },
  "_ctypes.get_shape": {
    replaceWith: "_ctypes.shape",
    note: "Use a propriedade _ctypes.shape em vez do método _ctypes.get_shape.",
  },
  "_ctypes.get_strides": {
    replaceWith: "_ctypes.strides",
    note: "Use a propriedade _ctypes.strides em vez do método _ctypes.get_strides.",
  },
  "_ctypes.get_as_parameter": {
    replaceWith: "_ctypes._as_parameter_",
    note: "Use a propriedade _ctypes._as_parameter_ em vez do método _ctypes.get_as_parameter.",
  },
  // 1.24.0
  fastCopyAndTranspose: {
    replaceWith: "T.copy()",
    note: "Substitua a chamada de numpy ou np pelo nome da variável.",
  },
  msort: {
    replaceWith: "sort(a, axis=0)",
    note: "'a' é o array de entrada.",
  },
  // 1.25.0
  alltrue: "all",
  sometrue: "any",
  cumproduct: "cumprod",
  product: "prod",
  round_: "round",
  find_common_type: "result_type",
  // 2.0.0
  safe_eval: {
    replaceWith: "literal_eval",
    note: "Substitua a chamada por numpy ou np por ast",
  },
  trapz: "trapezoid",
  in1d: "isin",
  row_stack: "vstack",
  // 2.2.0
  _add_newdoc_ufunc: {
    replaceWith: "ufunc.doc = newdoc",
    note: "Use atribuição direta ao atributo __doc__ do ufunc.",
  },
};

export default mapping;
