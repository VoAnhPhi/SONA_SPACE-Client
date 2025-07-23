import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';

export interface Notification {
    notification_id: number;
    title: string;
    message: string;
    created_at: string;
    link: string;
}


export interface MiniNotificationHandle {
    toggleMiniNotification: () => void;
    closeMiniNotification: () => void;
    isVisible: boolean;
    refreshNotifications: () => void;
    getNotificationCount: () => number;
}

interface MiniNotificationProps {
  onNotificationCountChange?: (count: number) => void;
}

const MiniNotification = forwardRef<MiniNotificationHandle, MiniNotificationProps>(
  ({ onNotificationCountChange }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const refreshNotifications = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await fetch("http://localhost:3501/api/couponcodes/notification", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch notifications");

        const data = await response.json();
        setNotifications(data);

        // 👉 Gọi callback cập nhật số lượng
        if (onNotificationCountChange) {
          onNotificationCountChange(data.length);
        }
      } catch (error) {
        console.error("Lỗi lấy thông báo:", error);
      }
    };

    useEffect(() => {
      refreshNotifications();
    }, []);

    useImperativeHandle(ref, () => ({
      toggleMiniNotification: () => setIsVisible((prev) => !prev),
      closeMiniNotification: () => setIsVisible(false),
      isVisible,
      refreshNotifications,
      getNotificationCount: () => notifications.length,
    }));
    // const refreshNotifications = async () => {
    //     // Replace with API call
    //     const demo = [
    //         { title: 'Bạn vừa có ưu đãi mới  ', message: 'Bạn có đơn hàng mới đang chờ xử lý cho người nmow snay snhdp nshsisnhd hdhdn hdjdn dhđ', created_at: '2025-07-23T10:00:00Z' },
    //         { title: 'Nhận mã giảm giá mới1', message: 'Mã giảm giá 10% đã được thêm vào tài khoản', created_at: '2025-07-22T14:35:00Z' },
    //         { title: 'Nhận mã giảm giá mới2', message: 'Mã giảm giá 10% đã được thêm vào tài khoản', created_at: '2025-07-22T14:35:00Z' },
    //         { title: 'Nhận mã giảm giá mới3', message: 'Mã giảm giá 10% đã được thêm vào tài khoản', created_at: '2025-07-22T14:35:00Z' },
    //         { title: 'Nhận mã giảm giá mới4', message: 'Mã giảm giá 10% đã được thêm vào tài khoản', created_at: '2025-07-22T14:35:00Z' },
    //         { title: 'Nhận mã giảm giá mới5', message: 'Mã giảm giá 10% đã được thêm vào tài khoản', created_at: '2025-07-22T14:35:00Z' },
    //     ];
    //     setNotifications(demo);
    // };
    // const refreshNotifications = async () => {
    //     try {
    //         const token = sessionStorage.getItem("authToken");
    //         const response = await fetch("http://localhost:3501/api/couponcodes/notification", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
          
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch notifications");
    //         }

    //         const data = await response.json();
    //           console.log('THONGBAO', data);
    //         setNotifications(data);
    //     } catch (error) {
    //         console.error("Lỗi lấy thông báo:", error);
    //     }
    // };

    const formatDate = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleString('vi-VN');
    };

    return (
        <div className={`mini-notification ${isVisible ? 'show' : ''}`}>
            <div className="mini-notification-content">
                <div className="mini-notification-header">
                    <h3>Thông báo của bạn ({notifications.length})</h3>
                    <button
                        className="close-mini-notification"
                        onClick={() => setIsVisible(false)}
                    >
                        <img src="/images/icons/close.svg" alt="Đóng" />
                    </button>
                </div>
                {notifications.length > 0 ? (
                    notifications.map((noti, index) => (
                        <div key={index} className="mini-notification-item">
                            <a href={noti.link || "/tai-khoan/ma-giam-gia"}>
                                <h4 className='noti-title'>{noti.title}</h4>
                                <div className="noti-message">{noti.message}</div>
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="empty-notification">
                        <p style={{fontFamily: "M-R", fontSize: '14px'}}>Không có thông báo mới</p>
                    </div>
                )}

            </div>
        </div>
    );
});

export default MiniNotification;
