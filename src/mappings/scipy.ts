const mapping:{[key:string]:object} = {
  integrate: {
    cumtrapz: 'cumulative_trapezoid',
    simps: 'simpson',
    trapz: 'trapezoid'
  },
  interpolate: { interp2d: 'bisplev' },
  linalg: { pinv2: 'pinv' },
  misc: {
    comb: '$special.comb',
    face: '$datasets.face',
    factorial: '$special.factorial',
    factorial2: '$special.factorial2',
    logsumexp: '$special.logsumexp'
  },
  signal: { hanning: 'windows.hann' },
  special: {
    errprint: 'seterr',
    sph_jn: 'spherical_jn',
    sph_yn: 'spherical_yn'
  },
  stats: {
    betai: 'betainc',
    chisqprob: 'sf',
    itemfreq: 'binned_statistic',
    rvs_ratio_uniforms: 'RatioUniforms'
  }
}

export default mapping;
