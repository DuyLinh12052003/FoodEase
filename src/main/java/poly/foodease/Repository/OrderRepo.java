package poly.foodease.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;
import poly.foodease.Model.Entity.Order;
import poly.foodease.Report.ReportOrder;
import poly.foodease.Report.ReportRevenueByMonth;
import poly.foodease.Report.ReportRevenueByYear;
import poly.foodease.Report.ReportUserBuy;

import java.util.List;

public interface OrderRepo extends JpaRepository<Order ,Integer> {

    @Query("SELECT o FROM Order o JOIN o.user u WHERE u.userName LIKE  :userName")
    Page<Order> getOrdersByUserName(@Param("userName") String userName, Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.orderStatus ost JOIN o.user u WHERE ost.orderStatusId = :orderStatusId AND u.userName=:userName")
    Page<Order> getOrderByStatusId(@Param("userName") String userName , @Param("orderStatusId") Integer orderStatusId , Pageable pageable);

    @Query("SELECT o FROM Order o JOIN o.orderStatus ost WHERE ost.orderStatusId = :orderStatusId")
    List<Order> getOrderIsShipping(@RequestParam("orderStatusId") Integer orderStatusId);

    @Query("SELECT o FROM Order o JOIN o.orderStatus ost WHERE ost.orderStatusId IN :orderStatusIds")
    List<Order> getOrdersToUpdate(@Param("orderStatusIds") List<Integer> orderStatusIds);

    // Ngọc
    @Query("SELECT new poly.foodease.Report.ReportOrder(o.orderDate, o.orderTime, SUM(o.totalPrice), SUM(o.totalQuantity)) " +
            "FROM Order o GROUP BY o.orderDate, o.orderTime ORDER BY o.orderDate")
    List<ReportOrder> findTotalPriceAndQuantityByOrderDate();

    @Query("SELECT new poly.foodease.Report.ReportRevenueByMonth(YEAR(o.orderDate) AS year, MONTH(o.orderDate) AS month, SUM(o.totalPrice) AS totalPrice, SUM(o.totalQuantity) AS totalQuantity) " +
            "FROM Order o " +
            "GROUP BY YEAR(o.orderDate), MONTH(o.orderDate) " +
            "ORDER BY year, month")
    List<ReportRevenueByMonth> getRevenueByMonth();

    @Query("SELECT new poly.foodease.Report.ReportRevenueByYear(YEAR(o.orderDate) AS year, SUM(o.totalPrice), SUM(o.totalQuantity))"
            + "FROM Order o GROUP BY YEAR(o.orderDate) ORDER BY year")
    List<ReportRevenueByYear> ReportRevenueByYear();

    @Query("SELECT new poly.foodease.Report.ReportUserBuy(o.user.userId,o.user.fullName,o.user.gender,o.user.phoneNumber,o.user.address,o.user.birthday,o.user.email,SUM(o.totalQuantity),SUM(o.totalPrice))"
            + " FROM Order o GROUP BY o.user.userId,o.user.fullName,o.user.gender,o.user.phoneNumber,o.user.address,o.user.birthday,o.user.email")
    Page<ReportUserBuy> findReportUserBuy(Pageable page);

}
