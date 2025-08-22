// Debug logic getCurrentStep chi tiết
function getCurrentStep(status, processType, defaultStep, orderData) {
  // console.log("=== getCurrentStep Debug ===");
  // console.log("Input parameters:", {
  //   status,
  //   processType,
  //   defaultStep,
  //   hasOrderData: !!orderData,
  //   hasReturnInfo: !!(orderData && orderData.returnInfo)
  // });
  
  const statusUpper = status.toUpperCase();
  const statusLower = status.toLowerCase();
  
  switch (processType) {
    case 'return':
      // console.log("Processing 'return' case");
      
      // Ưu tiên sử dụng statusStep từ API nếu có và hợp lệ
      if (defaultStep && defaultStep >= 1 && defaultStep <= 4) {
        // console.log("Using defaultStep from API:", defaultStep);
        return defaultStep;
      }
      // console.log("DefaultStep not valid, checking returnInfo");
      
      // Kiểm tra returnInfo nếu có
      if (orderData && orderData.returnInfo) {
        const returnInfo = orderData.returnInfo;
        const returnStatus = returnInfo.return_status;
        
        // console.log("Found returnInfo:", {
        //   return_status: returnStatus,
        //   returnInfo: returnInfo
        // });
        
        switch (returnStatus) {
          case 'PENDING': 
            // console.log("Return status PENDING -> Step 2");
            return 2;     // Chờ xử lý trả hàng
          case 'APPROVED': 
            // console.log("Return status APPROVED -> Step 3");
            return 3;    // Xác nhận trả hàng
          case 'REJECTED': 
            // console.log("Return status REJECTED -> Step 4");
            return 4;    // Đã trả hàng hoàn tất (bị từ chối)
          case 'COMPLETED': 
            // console.log("Return status COMPLETED -> Step 4");
            return 4;   // Đã trả hàng hoàn tất (thành công)
          default: 
            // console.log("Return status default -> Step 1");
            return 1;            // Yêu cầu trả hàng
        }
      }
      
      // console.log("No returnInfo found, using fallback logic");
      
      // Backend sử dụng chung logic CANCEL cho trả hàng, fallback nếu không có statusStep
      switch (statusUpper) {
        case 'RETURN':
        case 'RETURN_REQUESTED':
        case 'CANCEL_REQUESTED': 
          // console.log("Fallback: status match -> Step 1");
          return 1; // Yêu cầu trả hàng
        case 'RETURN_PENDING':
        case 'CANCEL_PENDING': 
          // console.log("Fallback: pending status -> Step 2");
          return 2;   // Chờ xử lý trả hàng
        case 'RETURN_CONFIRMED':
        case 'CANCEL_CONFIRMED': 
          // console.log("Fallback: confirmed status -> Step 3");
          return 3; // Xác nhận trả hàng
        case 'RETURNED':
        case 'REJECTED':
        case 'CANCELLED': 
          //        console.log("Fallback: completed status -> Step 4");
          return 4;        // Đã trả hàng hoàn tất
        default:
          // console.log("Fallback: default case -> Step 1");
          return 1; // Default to step 1 for return process
      }
    default:
      // console.log("Not a return process, returning defaultStep:", defaultStep);
      return defaultStep;
  }
}

// Test case với dữ liệu thực tế từ API
const testOrder = {
  "id": 435,
  "order_hash": "SN27499728",
  "date": "2025-08-14T14:23:22.000Z",
  "status": "RETURN",
  "statusStep": 4,
  "processType": "return",
  "returnInfo": {
    "return_id": 44,
    "reason": "123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",
    "return_type": "REFUND",
    "total_refund": "25000000.00",
    "return_status": "REJECTED",
    "return_created_at": "2025-08-14T17:53:59.000Z",
    "return_updated_at": "2025-08-14T18:32:24.000Z"
  }
};

// console.log("=== TESTING WITH REAL API DATA ===");
// console.log("Order data:", JSON.stringify(testOrder, null, 2));

const result = getCurrentStep(testOrder.status, testOrder.processType, testOrder.statusStep, testOrder);
// console.log("Final result:", result);
