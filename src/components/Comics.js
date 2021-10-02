import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {Link} from "react-router-dom";

const FEED_QUERY = gql`
    {
        getComics {
            id
            name
            author
        }
    }
`;

const render = (comic) => {
    return (
        <tr key={comic.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {comic.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {comic.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {comic.author}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-white hover:text-red-500 focus:outline-none mr-2">
                    <Link to={`comic/${comic.id}`} className='mr-1'>View</Link>
                </button>
                <button className="py-2 px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-white hover:text-red-500 focus:outline-none mr-2">
                    <Link to={`comic/edit/${comic.id}`}>Edit</Link>
                </button>
            </td>
        </tr>
    );
}

const Comics = () => {
    const comics = _.get(useQuery(FEED_QUERY), 'data.getComics', []);

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Id
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Author
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {
                                _.map(comics, render)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comics;