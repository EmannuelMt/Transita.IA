import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiCheck, FiCheckSquare, FiClock, FiAlertCircle, FiInfo, FiCheckCircle } from 'react-icons/fi';
import { useNotifications } from '../../contexts/NotificationContext';
import './NotificationPanel.css';

const NotificationPanel = () => {
  const {
    notifications,
    isPanelOpen,
    setIsPanelOpen,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    unreadCount
  } = useNotifications();

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Agora';
    if (minutes < 60) return `${minutes}min atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="notification-icon success" />;
      case 'warning':
        return <FiAlertCircle className="notification-icon warning" />;
      case 'error':
        return <FiAlertCircle className="notification-icon error" />;
      default:
        return <FiInfo className="notification-icon info" />;
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
      setIsPanelOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="notification-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPanelOpen(false)}
          />

          {/* Panel */}
          <motion.div
            className="notification-panel"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="notification-header">
              <div className="notification-title">
                <h3>Notificações</h3>
                {unreadCount > 0 && (
                  <span className="notification-count">{unreadCount}</span>
                )}
              </div>

              <div className="notification-actions">
                {notifications.length > 0 && (
                  <>
                    <motion.button
                      className="notification-action-btn"
                      onClick={markAllAsRead}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Marcar todas como lidas"
                    >
                      <FiCheckSquare />
                    </motion.button>

                    <motion.button
                      className="notification-action-btn"
                      onClick={clearAllNotifications}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Limpar todas"
                    >
                      <FiTrash2 />
                    </motion.button>
                  </>
                )}

                <motion.button
                  className="notification-close-btn"
                  onClick={() => setIsPanelOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FiX />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="notification-content">
              {notifications.length === 0 ? (
                <div className="notification-empty">
                  <FiInfo className="empty-icon" />
                  <p>Nenhuma notificação</p>
                  <span>Você está atualizado!</span>
                </div>
              ) : (
                <div className="notification-list">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      className={`notification-item ${!notification.read ? 'unread' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5 }}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="notification-icon-wrapper">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="notification-content-wrapper">
                        <div className="notification-header-row">
                          <h4 className="notification-title">{notification.title}</h4>
                          <div className="notification-meta">
                            <span className="notification-time">
                              <FiClock />
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            {!notification.read && (
                              <span className="notification-unread-dot" />
                            )}
                          </div>
                        </div>

                        <p className="notification-message">{notification.message}</p>

                        {notification.actionUrl && (
                          <span className="notification-action">Clique para ver mais →</span>
                        )}
                      </div>

                      <div className="notification-actions">
                        {!notification.read && (
                          <motion.button
                            className="notification-mark-read"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Marcar como lida"
                          >
                            <FiCheck />
                          </motion.button>
                        )}

                        <motion.button
                          className="notification-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          title="Excluir notificação"
                        >
                          <FiTrash2 />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;