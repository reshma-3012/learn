import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

// AuthContext
const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Components
const CourseList = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Course 1', description: 'Description of Course 1' },
    { id: 2, title: 'Course 2', description: 'Description of Course 2' },
  ]);

  return (
    <div>
      <h1>Course Listings</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <Link to={`/courses/${course.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = { id: courseId, title: `Course ${courseId}`, description: `Description of Course ${courseId}`, syllabus: 'Syllabus content', instructorId: 1 };

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <h2>Syllabus</h2>
      <p>{course.syllabus}</p>
      <h2>Instructor</h2>
      <InstructorProfile instructorId={course.instructorId} />
    </div>
  );
};

const InstructorProfile = ({ instructorId }) => {
  const instructor = { id: instructorId, name: 'Instructor Name', bio: 'Instructor bio' };

  return (
    <div>
      <h2>{instructor.name}</h2>
      <p>{instructor.bio}</p>
    </div>
  );
};

const Signup = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    login({ email: form.email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <label>Email:</label>
      <input type="email" name="email" value={form.email} onChange={handleChange} required />
      <label>Password:</label>
      <input type="password" name="password" value={form.password} onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
};

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    login({ email: form.email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <label>Email:</label>
      <input type="email" name="email" value={form.email} onChange={handleChange} required />
      <label>Password:</label>
      <input type="password" name="password" value={form.password} onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([
    { id: 1, title: 'Course 1', progress: 50 },
    { id: 2, title: 'Course 2', progress: 30 },
  ]);

  if (!user) return <div>Please log in</div>;
  return (
    <div>
      <h1>Learning Dashboard</h1>
      <h2>Enrolled Courses</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h3>{course.title}</h3>
            <p>Progress: {course.progress}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <nav>
          <Link to="/">Courses</Link> | <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link> | <Link to="/profile">Profile</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
