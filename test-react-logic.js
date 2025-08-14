// Test logic React component với dữ liệu API thực tế
async function testReactLogic() {
  // Simulate API response
  const apiResponse = {
    "success": true,
    "order": {
      "id": 435,
      "order_hash": "SN27499728",
      "date": "2025-08-14T14:23:22.000Z",
      "status": "RETURN",
      "statusStep": 4,
      "processType": "return",
      "couponCode": "",
      "couponValue": "",
      "recipientName": "Nguyễn Hồng Thái",
      "recipientEmail": "hongthai2007.hongthai2007@gmail.com",
      "recipientPhone": "0705768799",
      "address": "Xã Xuân Thới Đông, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
      "order_name_old": "Nguyễn Hồng Thái",
      "order_name_new": "",
      "order_email_old": "hongthai2007.hongthai2007@gmail.com",
      "order_email_new": "",
      "order_address_old": "Xã Xuân Thới Đông, Huyện Hóc Môn, Thành phố Hồ Chí Minh",
      "order_address_new": "",
      "order_number1": "0705768799",
      "order_number2": "",
      "paymentStatus": "PENDING",
      "shippingStatus": "pending",
      "subtotal": "25000000.00",
      "shippingFee": 30000,
      "discount": 0,
      "total": "25030000.00",
      "products": [
        {
          "id": 342,
          "name": "Bàn làm việc Cupertino",
          "image": "https://assets.boconcept.com/0a45a1ee-d336-4357-b7cc-ad6c00144f53/1601485_PNG-Web%2072dpi.png?format=webply&fit=bounds&width=1280&quality=75&height=960",
          "price": 2500000000,
          "quantity": 1,
          "slug": "ban-lam-viec-cupertino",
          "color": {
            "name": "Màu gỗ",
            "hex": "#5b4f42"
          },
          "category": "Bàn",
          "rating": {
            "count": 1,
            "average": "5.0000"
          },
          "has_comment": 0
        }
      ],
      "returnInfo": {
        "return_id": 44,
        "reason": "123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123",
        "return_type": "REFUND",
        "total_refund": "25000000.00",
        "return_status": "REJECTED",
        "return_created_at": "2025-08-14T17:53:59.000Z",
        "return_updated_at": "2025-08-14T18:32:24.000Z"
      }
    }
  };

  console.log("=== SIMULATING FETCHORDER LOGIC ===");

  if (apiResponse.success) {
    const mappedProducts = apiResponse.order.products.map(
      (p) => ({
        order_item_id: p.id,
        product_id: p.id,
        name: p.name,
        image: p.image || "/images/default.jpg",
        price: p.price,
        quantity: p.quantity,
        slug: p.slug,
        color: {
          name: p.color.name,
          hex: p.color.hex,
        },
        has_comment: p.has_comment,
      })
    );
    
    // Map order data and ensure processType and statusStep are properly set
    const orderData = {
      ...apiResponse.order,
      products: mappedProducts,
      processType: apiResponse.order.processType || undefined,
      statusStep: apiResponse.order.statusStep !== null && apiResponse.order.statusStep !== undefined 
        ? apiResponse.order.statusStep 
        : 1,
      returnInfo: apiResponse.order.returnInfo || undefined
    };
    
    console.log("fetchOrder - Full API Response:", apiResponse);
    console.log("fetchOrder - Raw statusStep:", apiResponse.order.statusStep);
    console.log("fetchOrder - Raw processType:", apiResponse.order.processType);
    console.log("fetchOrder - Raw returnInfo:", apiResponse.order.returnInfo);
    console.log("fetchOrder - Mapped Order Data:", orderData);

    // Simulate the render logic
    console.log("\n=== SIMULATING RENDER LOGIC ===");

    // Xác định loại quy trình dựa trên trạng thái đơn hàng
    function getProcessType(status, processType) {
      // Nếu có processType từ backend, ưu tiên sử dụng
      if (processType) {
        if (processType.toLowerCase() === 'return') return 'return';
        if (processType.toLowerCase() === 'cancellation') return 'cancellation';
        if (processType.toLowerCase() === 'failed') return 'failed';
        if (processType.toLowerCase() === 'normal') return 'normal';
      }
      
      const statusUpper = status.toUpperCase();
      const statusLower = status.toLowerCase();
      
      // Kiểm tra các trạng thái return
      if (statusUpper === 'RETURN' || statusLower.includes('trả') || statusLower.includes('return')) {
        return 'return';
      }
      
      // Kiểm tra các trạng thái hủy
      if (statusUpper === 'CANCELLED' || statusLower.includes('hủy') || statusLower.includes('huy') || statusLower.includes('cancel')) {
        return 'cancellation';
      }
      
      // Kiểm tra trạng thái thất bại
      if (statusUpper === 'FAILED' || statusLower.includes('thất bại') || statusLower.includes('failed')) {
        return 'failed';
      }
      
      // Mặc định là quy trình bình thường
      return 'normal';
    }

    // Lấy các bước của quy trình dựa trên loại
    function getProcessSteps(processType) {
      switch (processType) {
        case 'normal':
          return [
            { label: "Chờ xác nhận", icon: "fas fa-hourglass-start" },
            { label: "Xác nhận đơn", icon: "fas fa-check" },
            { label: "Đang giao hàng", icon: "fas fa-truck" },
            { label: "Hoàn thành", icon: "fas fa-box" },
            { label: "Đánh giá", icon: "fas fa-star" }
          ];
        case 'cancellation':
          return [
            { label: "Yêu cầu hủy", icon: "fas fa-times-circle" },
            { label: "Chờ xử lý hủy", icon: "fas fa-hourglass-half" },
            { label: "Xác nhận hủy", icon: "fas fa-check-circle" },
            { label: "Đã hủy hoàn tất", icon: "fas fa-ban" }
          ];
        case 'return':
          return [
            { label: "Yêu cầu trả hàng", icon: "fas fa-undo" },
            { label: "Chờ xử lý trả hàng", icon: "fas fa-hourglass-half" },
            { label: "Xác nhận trả hàng", icon: "fas fa-check-circle" },
            { label: "Hoàn tất yêu cầu", icon: "fas fa-box-open" }
          ];
        case 'failed':
          return [
            { label: "Đơn hàng thất bại", icon: "fas fa-exclamation-triangle" }
          ];
        default:
          return [];
      }
    }

    // Xác định bước hiện tại dựa trên trạng thái và loại quy trình
    function getCurrentStep(status, processType, defaultStep, orderData) {
      console.log("=== getCurrentStep Debug trong render ===");
      console.log("Input parameters:", {
        status,
        processType,
        defaultStep,
        hasOrderData: !!orderData,
        hasReturnInfo: !!(orderData && orderData.returnInfo)
      });

      const statusUpper = status.toUpperCase();
      const statusLower = status.toLowerCase();
      
      switch (processType) {
        case 'return':
          console.log("Processing 'return' case");
          
          // Ưu tiên sử dụng statusStep từ API nếu có và hợp lệ
          if (defaultStep && defaultStep >= 1 && defaultStep <= 4) {
            console.log("Using defaultStep from API:", defaultStep);
            return defaultStep;
          }
          console.log("DefaultStep not valid, checking returnInfo");
          
          // Kiểm tra returnInfo nếu có
          if (orderData && orderData.returnInfo) {
            const returnInfo = orderData.returnInfo;
            const returnStatus = returnInfo.return_status;
            
            console.log("Found returnInfo:", {
              return_status: returnStatus,
              returnInfo: returnInfo
            });
            
            switch (returnStatus) {
              case 'PENDING': 
                console.log("Return status PENDING -> Step 2");
                return 2;     // Chờ xử lý trả hàng
              case 'APPROVED': 
                console.log("Return status APPROVED -> Step 3");
                return 3;    // Xác nhận trả hàng
              case 'REJECTED': 
                console.log("Return status REJECTED -> Step 4");
                return 4;    // Đã trả hàng hoàn tất (bị từ chối)
              case 'COMPLETED': 
                console.log("Return status COMPLETED -> Step 4");
                return 4;   // Đã trả hàng hoàn tất (thành công)
              default: 
                console.log("Return status default -> Step 1");
                return 1;            // Yêu cầu trả hàng
            }
          }
          
          console.log("No returnInfo found, using fallback logic");
          return 1; // Default to step 1 for return process
        default:
          console.log("Not a return process, returning defaultStep:", defaultStep);
          return defaultStep;
      }
    }

    // Simulate the exact render logic
    const processType = getProcessType(orderData.status, orderData.processType);
    const steps = getProcessSteps(processType);
    const currentStep = getCurrentStep(orderData.status, processType, orderData.statusStep || 1, orderData);
    
    console.log("Debug Info:", {
      status: orderData.status,
      processType: orderData.processType,
      statusStep: orderData.statusStep,
      calculatedProcessType: processType,
      steps: steps.map(s => s.label),
      currentStep,
      orderData: orderData,
      returnInfo: orderData.returnInfo
    });

    console.log("\n=== FINAL RESULT ===");
    console.log("Current Step:", currentStep);
    console.log("Expected: 4");
    console.log("Match:", currentStep === 4 ? "✅ PASS" : "❌ FAIL");
  }
}

testReactLogic();
