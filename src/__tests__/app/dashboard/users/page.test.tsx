import UsersHandle from "@/app/dashboard/users/page";
import UsersHandleCliens from "@/app/dashboard/users/UsersHandleClient";
import { CountLengDataUsers, fetchUsers } from "@/services/api";
import { render,screen } from "@testing-library/react";

jest.mock('@/services/api', () => ({
  fetchUsers: jest.fn(),
  CountLengDataUsers: jest.fn(),
}));
interface InitialDataType {
    currentPage: number,
    searchTerm: string,
    usersPerPage: number,
    dataUsers: { id: number; name: string }[],
    totalPage: number,
};

jest.mock('@/app/dashboard/users/UsersHandleClient', () => {
    const mockUsersHandleCliens = ({ initialData }: { initialData: InitialDataType }) => (
        <div>
            <div>Mock UsersHandleCliens</div>
            <div>Users: {initialData.dataUsers.length}</div>
        </div>
    );
    mockUsersHandleCliens.displayName = 'mockUsersHandleCliens';
    return {
        __esModule: true,
        default: mockUsersHandleCliens,
    };
});

describe("UsersHandle (Server Component)", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("renders product client with fetched data", async () => {
        (fetchUsers as jest.Mock).mockResolvedValue([{ id: 1, name: "Tinky" }]);
        (CountLengDataUsers as jest.Mock).mockResolvedValue(1);

        render(await UsersHandle());

        expect(screen.getByText("Mock UsersHandleCliens")).toBeInTheDocument();
        expect(screen.getByText("Users: 1")).toBeInTheDocument();
    });

    test("shows error message when fetch fails", async () => {
        (fetchUsers as jest.Mock).mockRejectedValue(new Error("API error"));
        (CountLengDataUsers as jest.Mock).mockResolvedValue(0);

        render(await UsersHandle());

        expect(screen.getByText("Error Loading Products")).toBeInTheDocument();
        expect(screen.getByText("Please try again later")).toBeInTheDocument();
    });
});