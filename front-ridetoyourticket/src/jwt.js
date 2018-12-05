const jwtData = jwt => JSON.parse(window.atob(jwt.split('.')[1].replace('-', '+').replace('_', '/')))

export const userId = jwt => jwtData(jwt).data.id

export const isExpired = jwt => jwtData(jwt).exp < (Date.now()/1000)
