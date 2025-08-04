const mapping:any = {
    "DataFrame" : {
        "applymap": "map",
        "first":    "loc",
        "iteritems":"items",
        "last":     "loc",
        "pad":      "ffill",
        "select":   "loc",
        "swapaxes": "transpose"
    },
    "Series": {
        "iteritems": "items",
        "pad": "ffill"
    },
    "io": {
        "formats": {
            "style": {
                "Styler": {
                    "render": 'to_html'
                }
            }
        }
    }
}

export default mapping;