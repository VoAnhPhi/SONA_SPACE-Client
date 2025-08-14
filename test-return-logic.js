// Test logic cho việc tính currentStep với returnInfo
function getCurrentStep(status, processType, defaultStep, orderData) {
  const statusUpper = status.toUpperCase();
  const statusLower = status.toLowerCase();
  
  switch (processType) {
    case 'return':
      // Ưu tiên sử dụng statusStep từ API nếu có và hợp lệ
      if (defaultStep && defaultStep >= 1 && defaultStep <= 4) {
        return defaultStep;
      }
      
      // Kiểm tra returnInfo nếu có
      if (orderData && orderData.returnInfo) {
        const returnInfo = orderData.returnInfo;
        const returnStatus = returnInfo.return_status;
        
        switch (returnStatus) {
          case 'PENDING': return 2;     // Chờ xử lý trả hàng
          case 'APPROVED': return 3;    // Xác nhận trả hàng
          case 'REJECTED': return 4;    // Đã trả hàng hoàn tất (bị từ chối)
          case 'COMPLETED': return 4;   // Đã trả hàng hoàn tất (thành công)
          default: return 1;            // Yêu cầu trả hàng
        }
      }
      
      // Backend sử dụng chung logic CANCEL cho trả hàng, fallback nếu không có statusStep
      switch (statusUpper) {
        case 'RETURN':
        case 'RETURN_REQUESTED':
        case 'CANCEL_REQUESTED': return 1; // Yêu cầu trả hàng
        case 'RETURN_PENDING':
        case 'CANCEL_PENDING': return 2;   // Chờ xử lý trả hàng
        case 'RETURN_CONFIRMED':
        case 'CANCEL_CONFIRMED': return 3; // Xác nhận trả hàng
        case 'RETURNED':
        case 'REJECTED':
        case 'CANCELLED': return 4;        // Đã trả hàng hoàn tất
        default:
          // Kiểm tra các trạng thái có chứa từ khóa trả hàng
          if (statusLower.includes('yêu cầu trả') || statusLower.includes('return_request') || statusLower.includes('return')) return 1;
          if (statusLower.includes('chờ xử lý trả') || statusLower.includes('return_pending')) return 2;
          if (statusLower.includes('xác nhận trả') || statusLower.includes('return_confirm')) return 3;
          if (statusLower.includes('trả hoàn tất') || statusLower.includes('đã trả') || statusLower.includes('trả')) {
            return 4; // Đã trả hàng hoàn tất
          }
          return 1; // Default to step 1 for return process
      }
    default:
      return defaultStep;
  }
}

// Test case như API response
const testOrder = {
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

// Test case 1: Với statusStep từ API
console.log("=== TEST CASE 1: Với statusStep từ API (statusStep: 4) ===");
const currentStep1 = getCurrentStep(testOrder.status, testOrder.processType, testOrder.statusStep, testOrder);
console.log("Result:", currentStep1); // Mong đợi: 4

// Test case 2: Không có statusStep, chỉ dựa vào returnInfo
console.log("\n=== TEST CASE 2: Không có statusStep, chỉ dựa vào returnInfo (return_status: REJECTED) ===");
const currentStep2 = getCurrentStep(testOrder.status, testOrder.processType, null, testOrder);
console.log("Result:", currentStep2); // Mong đợi: 4

// Test case 3: Không có returnInfo và statusStep, fallback logic
console.log("\n=== TEST CASE 3: Không có returnInfo và statusStep, fallback logic ===");
const testOrderMinimal = {
  "status": "RETURN",
  "processType": "return"
};
const currentStep3 = getCurrentStep(testOrderMinimal.status, testOrderMinimal.processType, null, testOrderMinimal);
console.log("Result:", currentStep3); // Mong đợi: 1

// Test case 4: returnInfo với status khác
console.log("\n=== TEST CASE 4: returnInfo với return_status: PENDING ===");
const testOrderPending = {
  ...testOrder,
  returnInfo: {
    ...testOrder.returnInfo,
    return_status: "PENDING"
  }
};
const currentStep4 = getCurrentStep(testOrderPending.status, testOrderPending.processType, null, testOrderPending);
console.log("Result:", currentStep4); // Mong đợi: 2
