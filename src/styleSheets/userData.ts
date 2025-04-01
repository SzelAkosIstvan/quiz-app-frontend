interface UserData {
    username: string;
    isTeacher: boolean;
    token: string;//idk if i will use it
    image: string;
}

let currentUser: UserData | null = null;

export const handleLogin = async (id: string) => {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            const isTeacher = data.isTeacher==="true";
            const username = data.username;
            const image = data.image;
            //console.log("A bejenelentkezett felhasznalo: "+name+" egy tanar? :"+(isTeacher ? "yes" : "no"));

            currentUser = {username, isTeacher, token, image};
            return currentUser;
        } else {
            throw new Error('Hibás ID!');
        }
    } catch (error) {
        throw new Error('Hiba történt a bejelentkezés során.');
    }
};

export const getUserData = (): UserData | null => {
    return currentUser;
};

export const getUserImage = () => {
    return currentUser?.image;
}

export const setNewUserImage = async (newImage: string): Promise<void> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("Nincs érvényes token!");
        }
        const response = await fetch('http://localhost:8080/setAvatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({newImage}),
        });
        if (response.ok) {
            console.log("uj profilkep sikeresen beallitva");
            if(currentUser) {
                currentUser.image = newImage;
            }
        } else {
            throw new Error('Hibás ID!');
        }
    } catch (error) {
        throw new Error('Hiba történt a bejelentkezés során.');
    }
}

export const handleLogout = () => {
    currentUser = null;
    localStorage.removeItem('token');
};