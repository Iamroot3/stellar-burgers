import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ConstructorPage, Feed, Login, Register, ForgotPassword, ResetPassword, Profile, ProfileOrders, NotFound404 } from '../../pages';
import { AppHeader } from '@components';
import { IngredientDetails, OrderInfo } from '@components';
import { Modal } from '../modal/modal';
import styles from './app.module.css';

const App = () => {
  const navigate = useNavigate();

  const handleModalClose = () => {
    navigate(-1); // Или navigate('/feed') для модалок из ленты заказов
  };

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/orders" element={<ProfileOrders />} />

          {/* Модалки */}
          <Route
            path="/ingredients/:id"
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:number"
            element={
              <Modal title="Детали заказа" onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal title="История заказов" onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;