export default {
  async fetch(request) {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };
    try {
      const res = await fetch(
        "https://api.steampowered.com/ISteamApps/GetServersAtAddress/v0001/?addr=45.136.205.146:27015&format=json"
      );
      const data = await res.json();
      const servers = data?.response?.servers;
      if (servers && servers.length > 0) {
        const s = servers[0];
        return new Response(JSON.stringify({
          online: true,
          players: s.players,
          max_players: s.max_players,
          map: s.map,
          name: s.name
        }), { headers });
      }
      return new Response(JSON.stringify({ online: false }), { headers });
    } catch(e) {
      return new Response(JSON.stringify({ online: false, error: e.message }), { headers });
    }
  }
};