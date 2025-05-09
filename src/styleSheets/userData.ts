interface UserData {
    username: string;
    isTeacher: boolean;
    token: string;//idk if i will use it
    image: string;
}

let currentUser: UserData | null = null;

export const getCookie = (name:string)=> {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        // @ts-ignore
        return parts.pop().split(';').shift();
    }
}

export const searchStyle = (styleInitial: string): string => {
    if(styleInitial === 'p') {
        return 'personas';
    } else if(styleInitial === 'a') {
        return 'adventurer-neutral';
    } else if(styleInitial === 'm') {
        return 'micah';
    } else {
        return 'open-peeps';
    }
};

export const handleLogin = async (id: string) => {
    try {
        console.log(`na: ${process.env.REACT_APP_API_URL}`)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            //localStorage.setItem('token', token);
            document.cookie = `token=${token}; path=/; max-age=7200`;//2 hour expiration time
            const isTeacher = data.isTeacher==="true";
            const username = data.username;
            const image = data.image;
            document.cookie = `img=${image}; path=/; max-age=7200`;
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
    //return currentUser?.image;
    return getCookie('img');
}

export const decodeJwt = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

export const getUserName = ():string => {
    const currentToken = getCookie('token');
    if(currentToken) {
        const decoded = decodeJwt(currentToken);
        if (decoded) {
            return decoded.username;
        }
    }
    return "heh";
}

export const setNewUserImage = async (newImage: string): Promise<void> => {
    try {
        const token = getCookie('token');//localStorage.getItem('token');
        if (!token) {
            throw new Error("Nincs érvényes token!");
        }
        const id = decodeJwt(token).id;
        console.log(id);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/setAvatar`, {
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
            document.cookie = `img=${newImage}; path=/; max-age=7200`;
        } else {
            throw new Error('Hibás ID!');
        }
    } catch (error) {
        throw new Error('Hiba történt a bejelentkezés során.');
    }
}

export interface QuizListData {
    id: number;
    name: string;
}

export const getQuizList = async (): Promise<QuizListData[]> => {
    try {
        const token = getCookie('token');
        if (!token) {
            throw new Error("Nincs érvényes token!");
        }
        const id = decodeJwt(token).id;
        console.log(id);
        const response = await fetch('http://localhost:8080/getMyQuizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        if (response.ok) {
            console.log("quizek listaja sikeresen megszerezve");
            const quizzes: QuizListData[] = await response.json();
            console.log("quizek listája sikeresen megszerezve", quizzes);
            return quizzes;
        } else {
            throw new Error('Hibás ID!');
        }
    } catch (error) {
        throw new Error('Hiba történt a bejelentkezés során.');
    }
}

export const handleLogout = () => {
    currentUser = null;
    //localStorage.removeItem('token');
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = `img=; path=/; max-age=0`;
};