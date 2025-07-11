
export function createUser(userData) {
    return new Promise(async (resolve) => {
    const response = await fetch('https://ecomwebsite-lkkx.onrender.com/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        credentials:"include",
        headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
    });
}

export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
    try {
        const response = await fetch('https://ecomwebsite-lkkx.onrender.com/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        credentials:'include',
        headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
        const data = await response.json();
        resolve({ data });
        } else {
        const error = await response.text();
        reject(error);
        }
    } catch (error) {
        reject( error );
    }

    // TODO: on server it will only return some info of user (not password)
    });
}

export function checkAuth() {
    return new Promise(async (resolve, reject) => {
    try {
        const response = await fetch('https://ecomwebsite-lkkx.onrender.com/auth/check',{
            credentials:"include",
        });
        if (response.ok) {
        const data = await response.json();
        resolve({ data });
        } else {
        const error = await response.text();
        reject(error);
        }
    } catch (error) {
        reject( error );
    }

    // TODO: on server it will only return some info of user (not password)
    });
}


export function signOut(userId) {
    return new Promise(async (resolve) => {
        const response = await fetch("https://ecomwebsite-lkkx.onrender.com/auth/logout",{
            credentials:'include'
        })
        const data = await response.json()
        resolve({ data });
    });
}