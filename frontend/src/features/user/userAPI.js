export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('https://ecomwebsite-lkkx.onrender.com/orders/own/',{credentials:'include'}) 
    const data = await response.json()
    resolve({data})
  }
  );
}


export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch('https://ecomwebsite-lkkx.onrender.com/users/own',{credentials:'include'}) 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('https://ecomwebsite-lkkx.onrender.com/users/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      credentials:'include',
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}