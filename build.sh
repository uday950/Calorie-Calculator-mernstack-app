echo " === STARTING BUILD PROCESS ==="

echo "=== BUILDING FRONTEND BUILD ==="
cd client
npm install #install frontend dependencies
npm run build

echo "=== COPY BUILD INTO BACKEND PUBLIC ==="
cd ../
mkdir -p ./server/public
cp -r ./client/build/* ./server/public/

echo "=== BUILDING BACKEND ==="
cd server
npm install #install backend dependencies

cd ../ #return to app root level

echo "=== BUILDING SCRIPT COMPLETE ==="
