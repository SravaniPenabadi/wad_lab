import java.sql.*;
import java.util.Scanner;

public class StudentCRUD {

    static final String URL = "jdbc:oracle:thin:@10.100.0.11:1521:ORCL11G";
    static final String USER = "24071A0551";
    static final String PASS = "24071A0551";

    public static void main(String[] args) {

        try {
            // Load Oracle Driver
            Class.forName("oracle.jdbc.driver.OracleDriver");

            // Establish Connection
            Connection con = DriverManager.getConnection(URL, USER, PASS);
            System.out.println("Connected to Oracle Database Successfully!");

            Scanner sc = new Scanner(System.in);
            int choice;

            do {
                System.out.println("\n===== STUDENT CSE CRUD MENU =====");
                System.out.println("1. Insert Student");
                System.out.println("2. View Students");
                System.out.println("3. Update Student Name");
                System.out.println("4. Delete Student");
                System.out.println("5. Exit");
                System.out.print("Enter your choice: ");
                choice = sc.nextInt();

                switch (choice) {

                    // INSERT
                    case 1:
                        System.out.print("Enter Roll No: ");
                        int roll = sc.nextInt();
                        sc.nextLine();

                        System.out.print("Enter Name: ");
                        String name = sc.nextLine();

                        System.out.print("Enter Class: ");
                        String cls = sc.nextLine();

                        System.out.print("Enter Section: ");
                        int sec = sc.nextInt();

                        String insertQuery = "INSERT INTO student_cse VALUES (?, ?, ?, ?)";
                        PreparedStatement psInsert = con.prepareStatement(insertQuery);
                        psInsert.setInt(1, roll);
                        psInsert.setString(2, name);
                        psInsert.setString(3, cls);
                        psInsert.setInt(4, sec);

                        int rowsInserted = psInsert.executeUpdate();
                        System.out.println(rowsInserted + " record inserted successfully.");
                        psInsert.close();
                        break;

                    // VIEW
                    case 2:
                        String selectQuery = "SELECT * FROM student_cse";
                        Statement stmt = con.createStatement();
                        ResultSet rs = stmt.executeQuery(selectQuery);

                        System.out.println("\nRollNo   Name      Class   Section");
                        while (rs.next()) {
                            System.out.println(
                                rs.getInt("rollno") + "       " +
                                rs.getString("name") + "       " +
                                rs.getString("class") + "       " +
                                rs.getInt("section")
                            );
                        }

                        rs.close();
                        stmt.close();
                        break;

                    // UPDATE (Only Name for simplicity)
                    case 3:
                        System.out.print("Enter Roll No to update: ");
                        int updateRoll = sc.nextInt();
                        sc.nextLine();

                        System.out.print("Enter New Name: ");
                        String newName = sc.nextLine();

                        String updateQuery = "UPDATE student_cse SET name=? WHERE rollno=?";
                        PreparedStatement psUpdate = con.prepareStatement(updateQuery);
                        psUpdate.setString(1, newName);
                        psUpdate.setInt(2, updateRoll);

                        int rowsUpdated = psUpdate.executeUpdate();
                        System.out.println(rowsUpdated + " record updated successfully.");
                        psUpdate.close();
                        break;

                    // DELETE
                    case 4:
                        System.out.print("Enter Roll No to delete: ");
                        int deleteRoll = sc.nextInt();

                        String deleteQuery = "DELETE FROM student_cse WHERE rollno=?";
                        PreparedStatement psDelete = con.prepareStatement(deleteQuery);
                        psDelete.setInt(1, deleteRoll);

                        int rowsDeleted = psDelete.executeUpdate();
                        System.out.println(rowsDeleted + " record deleted successfully.");
                        psDelete.close();
                        break;

                    case 5:
                        System.out.println("Exiting Application...");
                        break;

                    default:
                        System.out.println("Invalid Choice!");
                }

            } while (choice != 5);

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}