// Set config defaults when creating the instance
import axiosInit from "axios";

const instance = axiosInit.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWExZjIwNzAxYWY2MzFhMTNlNWY2NGI5ZmM2OWUxYiIsInN1YiI6IjVhN2QyYzQ3MGUwYTI2M2U4NTAwMDhkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3NO9tDVEdi2KYhccQ-XLOA-uvsoH3felcoLi5MIdL0M';


export default instance;