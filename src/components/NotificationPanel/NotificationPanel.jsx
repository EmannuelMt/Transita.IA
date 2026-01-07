import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBell, 
  FiFilter, 
  FiTrash2, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiInfo, 
  FiZap,
  FiAlertCircle,
  FiClock,
  FiChevronRight
} from 'react-icons/fi';

import './NotificationPanel.css';

const Notifications = ({ modal = false }) => {
  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const fullNotifications = [
    { 
      id: '1', 
      title: 'Excesso de Velocidade Detectado', 
      desc: 'Veículo ABC-1234 ultrapassou 110km/h na BR-116 em São Paulo. Recomendamos verificar o condutor e emitir alerta de segurança.', 
      time: 'Há 5 minutos', 
      type: 'critical', 
      read: false,
      vehicle: 'ABC-1234',
      location: 'BR-116, São Paulo'
    },
    { 
      id: '2', 
      title: 'Nova Multa Registrada', 
      desc: 'A infração "Estacionar em local proibido" foi detectada pelo radar. Validade: 30 dias para recurso.', 
      time: 'Há 2 horas', 
      type: 'warning', 
      read: false,
      fineCode: '505-4',
      amount: 'R$ 130,16'
    },
    { 
      id: '3', 
      title: 'Relatório Semanal Pronto', 
      desc: 'Sua análise detalhada de consumo de combustível já está disponível para download. Inclui insights de otimização.', 
      time: 'Há 5 horas', 
      type: 'info', 
      read: true,
      reportType: 'Consumo',
      period: 'Semanal'
    },
    { 
      id: '4', 
      title: 'Login Detectado', 
      desc: 'Um novo login foi realizado a partir de um dispositivo Desktop em Rio de Janeiro. IP: 192.168.1.100', 
      time: 'Ontem às 14:30', 
      type: 'info', 
      read: true,
      device: 'Desktop',
      location: 'Rio de Janeiro'
    },
    { 
      id: '5', 
      title: 'Manutenção Preventiva', 
      desc: 'O veículo Renault Master (DEF-5678) atingiu o limite de quilometragem. Agende manutenção preventiva.', 
      time: '2 dias atrás', 
      type: 'warning', 
      read: true,
      vehicle: 'DEF-5678',
      mileage: '15.000 km'
    },
    { 
      id: '6', 
      title: 'Pagamento Aprovado', 
      desc: 'O pagamento da multa 2024/001 foi confirmado. Valor: R$ 195,23. Comprovante disponível.', 
      time: '3 dias atrás', 
      type: 'info', 
      read: true,
      status: 'Pago',
      reference: '2024/001'
    },
  ];

  const filteredNotifications = fullNotifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'critical') return n.type === 'critical';
    if (filter === 'warning') return n.type === 'warning';
    if (filter === 'info') return n.type === 'info';
    return true;
  });

  const stats = {
    total: fullNotifications.length,
    unread: fullNotifications.filter(n => !n.read).length,
    critical: fullNotifications.filter(n => n.type === 'critical').length,
    warning: fullNotifications.filter(n => n.type === 'warning').length,
  };

  const markAsRead = (id) => {
    // Em uma aplicação real, aqui seria uma chamada API
    console.log(`Marcar notificação ${id} como lida`);
  };

  const deleteNotification = (id) => {
    // Em uma aplicação real, aqui seria uma chamada API
    console.log(`Deletar notificação ${id}`);
  };

  const markAllAsRead = () => {
    console.log('Marcar todas como lidas');
  };

  const clearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar todas as notificações?')) {
      console.log('Limpar todas as notificações');
    }
  };

  const getTypeConfig = (type) => {
    switch(type) {
      case 'critical':
        return {
          icon: FiAlertTriangle,
          bg: 'notification-critical-bg',
          iconColor: 'notification-critical-icon',
          border: 'notification-critical-border',
          label: 'Crítico'
        };
      case 'warning':
        return {
          icon: FiAlertCircle,
          bg: 'notification-warning-bg',
          iconColor: 'notification-warning-icon',
          border: 'notification-warning-border',
          label: 'Aviso'
        };
      default:
        return {
          icon: FiInfo,
          bg: 'notification-info-bg',
          iconColor: 'notification-info-icon',
          border: 'notification-info-border',
          label: 'Informação'
        };
    }
  };

  return (
    <div className={`notifications-page ${modal ? 'modal' : ''}`}>
      <div className={`notifications-container ${modal ? 'modal' : ''}`}>
        {/* Header */}
        <header className={`notifications-header ${modal ? 'modal' : ''}`}>
          <div className={`notifications-header-main ${modal ? 'modal' : ''}`}>
            <div className={`notifications-badge ${modal ? 'modal' : ''}`}>
              <FiBell className="notification-bell-icon" />
              <span>Central de Notificações</span>
            </div>
            <h1 className={`notifications-title ${modal ? 'modal' : ''}`}>Gestão de Alertas</h1>
            <p className={`notifications-subtitle ${modal ? 'modal' : ''}`}>
              Gerencie todas as comunicações do sistema de forma inteligente
            </p>
          </div>

          {/* Stats */}
          <div className="notifications-stats">
            <div className="stat-item">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number stat-unread">{stats.unread}</span>
              <span className="stat-label">Não lidas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number stat-critical">{stats.critical}</span>
              <span className="stat-label">Críticas</span>
            </div>
            <div className="stat-item">
              <span className="stat-number stat-warning">{stats.warning}</span>
              <span className="stat-label">Avisos</span>
            </div>
          </div>
        </header>

        {/* Filters and Actions */}
        <div className={`notifications-controls ${modal ? 'modal' : ''}`}>
          <div className="filters-container">
            <div className="filters-label">
              <FiFilter />
              <span>Filtrar por:</span>
            </div>
            <div className="filters-buttons">
              {[
                { key: 'all', label: 'Todas' },
                { key: 'unread', label: 'Não lidas' },
                { key: 'critical', label: 'Críticas' },
                { key: 'warning', label: 'Avisos' },
                { key: 'info', label: 'Informações' }
              ].map((filterItem) => (
                <button
                  key={filterItem.key}
                  onClick={() => setFilter(filterItem.key)}
                  className={`filter-button ${modal ? 'modal' : ''} ${filter === filterItem.key ? 'filter-button-active' : ''}`}
                >
                  {filterItem.label}
                </button>
              ))}
            </div>
          </div>

          <div className="actions-container">
            <button 
              className="action-button action-button-secondary"
              onClick={markAllAsRead}
            >
              <FiCheckCircle />
              <span>Marcar todas como lidas</span>
            </button>
            <button 
              className="action-button action-button-danger"
              onClick={clearAll}
            >
              <FiTrash2 />
              <span>Limpar todas</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className={`notifications-list ${modal ? 'modal' : ''}`}>
          {filteredNotifications.length === 0 ? (
            <div className="notifications-empty">
              <div className="notifications-empty-icon">
                <FiBell size={48} />
              </div>
              <h3 className="notifications-empty-title">
                Nenhuma notificação encontrada
              </h3>
              <p className="notifications-empty-description">
                {filter === 'all' 
                  ? 'Todas as notificações foram processadas' 
                  : `Nenhuma notificação do tipo "${filter}" encontrada`}
              </p>
              {filter !== 'all' && (
                <button 
                  className="notifications-empty-action"
                  onClick={() => setFilter('all')}
                >
                  Ver todas as notificações
                </button>
              )}
            </div>
          ) : (
            <motion.div 
              className="notifications-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredNotifications.map((notification, index) => {
                const typeConfig = getTypeConfig(notification.type);
                const Icon = typeConfig.icon;

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`notification-card ${modal ? 'modal' : ''} ${typeConfig.border} ${notification.read ? 'notification-read' : 'notification-unread'}`}
                  >
                    <div className={`notification-card-header ${modal ? 'modal' : ''}`}>
                      <div className="notification-type-indicator">
                        <div className={`notification-icon-container ${modal ? 'modal' : ''} ${typeConfig.bg}`}>
                          <Icon className={typeConfig.iconColor} />
                        </div>
                        <span className={`notification-type-label ${typeConfig.bg.replace('-bg', '-text')}`}>
                          {typeConfig.label}
                        </span>
                      </div>
                      
                      <div className="notification-meta">
                        <FiClock className="notification-time-icon" />
                        <span className="notification-time">{notification.time}</span>
                        {!notification.read && (
                          <div className="notification-unread-badge">
                            Nova
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`notification-card-content ${modal ? 'modal' : ''}`}>
                      <h3 className={`notification-title ${modal ? 'modal' : ''}`}>
                        {notification.title}
                      </h3>
                      <p className={`notification-description ${modal ? 'modal' : ''}`}>
                        {notification.desc}
                      </p>
                      
                      {/* Additional Info */}
                      <div className="notification-details">
                        {notification.vehicle && (
                          <div className="notification-detail">
                            <span className="detail-label">Veículo:</span>
                            <span className="detail-value">{notification.vehicle}</span>
                          </div>
                        )}
                        {notification.location && (
                          <div className="notification-detail">
                            <span className="detail-label">Local:</span>
                            <span className="detail-value">{notification.location}</span>
                          </div>
                        )}
                        {notification.amount && (
                          <div className="notification-detail">
                            <span className="detail-label">Valor:</span>
                            <span className="detail-value">{notification.amount}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="notification-card-footer">
                      <div className="notification-actions">
                        {!notification.read && (
                          <button 
                            className="notification-action notification-action-primary"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <FiCheckCircle />
                            <span>Marcar como lida</span>
                          </button>
                        )}
                        <button 
                          className="notification-action notification-action-secondary"
                          onClick={() => {/* View details action */}}
                        >
                          <span>Ver detalhes</span>
                          <FiChevronRight />
                        </button>
                        <button 
                          className="notification-action notification-action-danger"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Footer Info */}
        <div className="notifications-footer">
          <div className="footer-info">
            <FiZap className="footer-icon" />
            <p className="footer-text">
              Notificações são atualizadas em tempo real. Mantenha-se informado sobre todas as atividades do sistema.
            </p>
          </div>
          <div className="footer-legend">
            <div className="legend-item">
              <div className="legend-color legend-critical"></div>
              <span>Crítico - Requer ação imediata</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-warning"></div>
              <span>Aviso - Atenção necessária</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-info"></div>
              <span>Informação - Para sua ciência</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;